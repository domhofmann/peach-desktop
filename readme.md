# Peach Desktop

A pre-alpha desktop client for Peach ([peach.cool](http://peach.cool/)) - built using unannounced API endpoints intercepted from the official iOS app.

Built with Node + Electron + Menubar + Zepto + Nunjucks, and a bunch of hacky JS/CSS. Feel free to completely rearchitect or clean up as you see fit. 

### Developing:

```
npm install
npm start
```

If `npm start` fails, first make sure you have electron-prebuilt installed via NPM. Then cd to the working directory and give `electron app.js` a shot.

### Currently working:

- App launches to menu bar / system tray
- Login with saved state
- View list of connections
- View a connection's stream

### Not working:

- Everything else

