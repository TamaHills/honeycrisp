/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { h, render } from 'preact';
import { App } from './app';
import './index.scss';

const root_app = (musickit: MusicKit.MusicKitInstance) => h(App, { musickit });

document.addEventListener('musickitloaded', () => {
    const params = new URLSearchParams(window.location.search)

    const token = params.get('token')

    const musickit = MusicKit.configure({
        developerToken: token,
        app: {
            name: "honeycrisp",
            version: "0.0.1"
        }
    })

    render(root_app(musickit), document.getElementById('app'));
})


