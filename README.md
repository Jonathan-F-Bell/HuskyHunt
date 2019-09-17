# HuskyHunt

Tool to optimize collection of husky hunt photos

## Files

The important files are as follows:
* index.html
* Everything in the `css` folder
* Everything in the `js` folder
* Everything in the `img` folder

The remaining items are either this readme, or images/files that configure browser favicons/home screen icons and are not necessary for operation.

## Configuration

This is designed to run as a static webpage, which can be hosted by github pages, gitlab, or any server of your choosing.

There are three items which must be configured for this to work, all labeled by "SET-THIS".
You can get the requried items from the [Google Drive API Page](https://developers.google.com/drive/)
* In `index.html`
  * Line 71, client ID
  * Line 72, API Key
* In `js/script.js`
  * Line 52, Google Drive Folder ID
  * This can be found in the URL of the folder you wish the photos to go to. Note that this folder must be shared with all teammates or they won't be able to add photos.
