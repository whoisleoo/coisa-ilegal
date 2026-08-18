const path = require("path");
const fs = require("fs");
const pkgFetch = require("@yao-pkg/pkg-fetch");
const rcedit = require("rcedit");

const NODE_RANGE = "node18";
const PLATFORM = "win32";
const ARCH = "x64";

const pkgJson = require("../package.json");
const cfg = pkgJson.config || {};

const CUSTOM_BASE_PATH = path.join(__dirname, "..", ".cache", "node-base.exe");

async function main() {
  const originalPath = await pkgFetch.need({
    nodeRange: NODE_RANGE,
    platform: PLATFORM,
    arch: ARCH,
  });

  fs.mkdirSync(path.dirname(CUSTOM_BASE_PATH), { recursive: true });
  fs.copyFileSync(originalPath, CUSTOM_BASE_PATH);

  const iconPath = path.join(__dirname, "..", cfg.icon || "assets/icon.ico");
  const options = {
    "version-string": {
      ProductName: cfg.productName || pkgJson.name,
      FileDescription: cfg.fileDescription || pkgJson.description || pkgJson.name,
      CompanyName: cfg.companyName || "",
    },
    "file-version": cfg.fileVersion || pkgJson.version,
    "product-version": cfg.productVersion || pkgJson.version,
  };

  if (fs.existsSync(iconPath)) {
    options.icon = iconPath;
  } else {
    console.warn(
      `Icone não encontrado. ${iconPath}`
    );
  }

  await rcedit(CUSTOM_BASE_PATH, options);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
