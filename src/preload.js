// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// getall: (category) => ipcRenderer.invoke("getAllQuests", category),

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("generic", {
    quitApp: () => ipcRenderer.invoke("quitProgram"),
    importJsFile: () => ipcRenderer.invoke("importJsFile"),
    importJsonFile: () => ipcRenderer.invoke("importJsonFile"),
    saveFile: (data) => ipcRenderer.invoke("saveFile", data),
    saveNewFIle: (data => ipcRenderer.invoke("saveNewFile", data))
})