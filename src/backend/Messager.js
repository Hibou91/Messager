import { ipcMain, app, dialog } from "electron";
import fileUtil from "./fileUtil";

export default class {
  constructor() {
    this.path = "";
    this.fileType = "";
    ipcMain.handle("quitProgram", () => app.quit());
    ipcMain.handle("importJsFile", () => this.importJsFile());
    ipcMain.handle("importJsonFile", () => this.importJsonFile());
    ipcMain.handle("saveFile", (event, data) => this.saveFile(data));
    ipcMain.handle("saveNewFile", (event, data) => this.saveNewFile(data));
  }

  async importJsonFile() {
    this.fileType = "json";
    const options = {
      filters: [{ name: "json", extensions: ["json"] }],
    };
    let file = await dialog.showOpenDialog(options);

    if (file && file.canceled == false) {
      this.path = encodeURI(file.filePaths[0]);

      let data = await fileUtil.importFileData(this.path);

      try {
        data = JSON.parse(data);
        return data;
      } catch (err) {
        console.log(err);

        return false;
      }
    }

    return false;
  }

  async importJsFile() {
    this.fileType = "js";
    const options = {
      filters: [{ name: "js", extensions: ["js"] }],
    };
    let file = await dialog.showOpenDialog(options);

    if (file && file.canceled == false) {
      this.path = encodeURI(file.filePaths[0]);

      let text = await fileUtil.importFileData(this.path);

      text = text.replace("export default messages;", "return messages;");

      try {
        let data = {};
        //import("file://" + decodeURI(this.path)).then(module => data = module);*/
        data = new Function(text)();
        //data = eval(text)

        return data;
      } catch (err) {
        console.log(err);

        return false;
      }
    }

    return false;
  }

  async saveFile(data) {

  

    let messageBuffer = JSON.stringify(data);

    if (this.fileType == "js") {
      messageBuffer = "const messages = " + messageBuffer;

      messageBuffer += ";export default messages;";
    } 
    return fileUtil.exportFileData(this.path, messageBuffer);
  }

  async saveNewFile() {
    const options = {
      filters: [{ name: "js", extensions: ["js"] }],
    };
    let file = await dialog.showSaveDialog(options);

    if (file && file.canceled == false) {
      this.path = encodeURI(file.filePath);

      return fileUtil.exportFileData(this.path, data);
    }

    return false;
  }
}
