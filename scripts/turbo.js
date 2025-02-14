import { TurboFactory } from '@ardrive/turbo-sdk';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';

async function getContentType(filePath) {
    return mime.lookup(filePath) || 'application/octet-stream';
}

export default async function TurboDeploy(jwk) {
    const turbo = TurboFactory.authenticated({ privateKey: jwk });
    const deployFolder = './dist';

    // Load or create manifest
    let manifest;
    try {
        manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf-8'));
    } catch {
        manifest = {
            manifest: 'arweave/paths',
            version: '0.2.0',
            index: { path: '' },
            paths: {}
        };
    }

    async function processFiles(dir) {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
            const filePath = path.join(dir, file);
            const relativePath = path.relative(deployFolder, filePath)
                .split(path.sep)
                .join('/');

            if (fs.statSync(filePath).isDirectory()) {
                await processFiles(filePath);
                continue;
            }

            if (manifest.paths[relativePath]) continue;

            console.log(`Uploading: ${relativePath}`);
            const uploadResult = await turbo.uploadFile({
                fileStreamFactory: () => fs.createReadStream(filePath),
                fileSizeFactory: () => fs.statSync(filePath).size,
                dataItemOpts: {
                    tags: [{ 
                        name: 'Content-Type', 
                        value: await getContentType(filePath) 
                    }],
                },
            });

            manifest.paths[relativePath] = { id: uploadResult.id };
        }
    }

    if (!fs.existsSync(deployFolder)) {
        throw new Error('Dist folder not found. Run npm run build first.');
    }

    await processFiles(deployFolder);

    const indexPath = Object.keys(manifest.paths)
        .find(path => path.match(/index-.*html$/i));
    
    if (indexPath) {
        manifest.index.path = indexPath;
    }

    // Upload the manifest file
    const uploadResult = await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream('manifest.json'),
        fileSizeFactory: () => fs.statSync('manifest.json').size,
        dataItemOpts: {
            tags: [{
                name: 'Content-Type',
                value: 'application/x.arweave-manifest+json'
            }],
        },
    });

    // Store the manifest ID in the manifest file
    manifest.id = uploadResult.id;
    fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));

    return uploadResult.id;
}
