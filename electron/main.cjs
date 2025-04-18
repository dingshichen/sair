const { app, BrowserWindow } = require('electron')
const path = require('path')

// 禁用 Autofill 警告
app.commandLine.appendSwitch('disable-features', 'AutofillShowTypePredictions')

let mainWindow = null

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // 在开发环境中加载 Vite 开发服务器
  if (!app.isPackaged) {
    try {
      // 等待开发服务器准备就绪
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await mainWindow.loadURL('http://localhost:5173')
      mainWindow.webContents.openDevTools()
    } catch (error) {
      console.error('Failed to load development server:', error)
      // 如果加载失败，5秒后重试
      setTimeout(() => {
        mainWindow.loadURL('http://localhost:5173')
      }, 5000)
    }
  } else {
    // 在生产环境中加载打包后的文件
    await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
}) 