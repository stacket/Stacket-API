# Stacket-API
Build powerful systems integrating your services together like never before.

# Creating a client
```ts
import Stacket from "stacket";

const client = new Stacket("auth-token");

client.verify().then(() => {
    console.log("Authenticated with Stacket");
}).catch(console.error);
```

# Create service
```js
client.createService({
    "type": "minecraft",
    "node": "fsn10",
    "package": "pkg1",
    "platform": "spigot",
    "version": "1.8.8"
}).then(service => {
    console.log(service);
}).catch(console.error);
```

# Rename service
```js
let serviceId = "5ef951de74eb7027994b585b";
client.getService(serviceId).then(service => {
    service.setName("New service name!");
}).catch(console.error);
```

# Delete service
```js
let serviceId = "5ef951de74eb7027994b585b";
client.getService(serviceId).then(service => {
    service.delete();
}).catch(console.error);
```

# Create network
```js
client.createNetwork({
    "name": "Test Network",
    "type": "ipv6"
}).then(network => {
    console.log(network);
}).catch(console.error);
```

# Rename network
```js
let networkId = "5ea5d1f9c2c50957ceae7dfb";
client.getNetwork(networkId).then(network => {
    network.setName("New network name!");
}).catch(console.error);
```

# Delete network
```js
let networkId = "5ea5d1f9c2c50957ceae7dfb";
client.getNetwork(networkId).then(network => {
    network.delete();
}).catch(console.error);
```

# Create Drive
```js
client.createDrive({
    "name": "Test Drive",
    "size": 250 // Specified in GB
}).then(drive => {
    console.log(drive);
}).catch(console.error);
```

# Rename Drive
```js
let driveId = "5ef5f7e771cdd7625a303da6";
client.getDrive(driveId).then(drive => {
    drive.setName("New drive name!");
}).catch(console.error);
```

# Resize Drive
```js
let driveId = "5ef5f7e771cdd7625a303da6";
client.getDrive(driveId).then(drive => {
    drive.setSize(500);
}).catch(console.error);
```

# Delete Drive
```js
let driveId = "5ef5f7e771cdd7625a303da6";
client.getDrive(driveId).then(drive => {
    drive.delete();
}).catch(console.error);
```

# Create Folder
```js
client.createFolder({
    "name": "Test Folder",
    "disks": [],
    "networks": [],
    "services": ["5ef951de74eb7027994b585b"]
});
```

# Rename Folder
```js
let folderId = "5f177a83e355067a6dfa037a";
client.getFolder(folderId).then(folder => {
    folder.setName("New folder name!");
}).catch(console.error);
```

# Add Item to Folder
```js
let folderId = "5f177a83e355067a6dfa037a";
client.getFolder(folderId).then(folder => {
    folder.addItem({"id": "5ef951de74eb7027994b585b", "type": "service"});
}).catch(console.error);
```

# Remove Item from Folder
```js
let folderId = "5f177a83e355067a6dfa037a";
client.getFolder(folderId).then(folder => {
    folder.removeItem({"id": "5ef951de74eb7027994b585b", "type": "service"});
}).catch(console.error);
```

# Delete Folder
```js
let folderId = "5f177a83e355067a6dfa037a";
client.getFolder(folderId).then(folder => {
    folder.delete();
}).catch(console.error);
```