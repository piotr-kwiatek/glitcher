# The Glitcher

### What is The Glitcher?

The Glitcher is simple tool which allows you to compare any image with your actual website. 

### How to initialize it?

Just download the *glitcher.js* file and create new ```glitcher``` object.
Example:
```
const testImage = new Glitcher();
```

You can also change options, such as:
- imageNameLikeSite: ```bool``` - default is true - image name is the same like site which you are watching,
- imageName: ```string``` - default is null - if above option is false, you have to set name of your imagefile,
- folderPath: ```string``` - default is empty string which means that image file is in the same directory as site, 
- fileExtension: ```string``` - default is jpg,
- alternateText: ```string``` - just alternative text for image. Default is "glitcher",
- pointerEvents: ```string``` - default is false - CSS property which allows you to click on glitcher imag ,
- lowerOpacityKeyCode: ```number``` - default is 49 which is 1 on keyboard - sets lower opacity,
- higherOpacityKeyCode: ```number``` - default is 50 which is 2 on keyboard - sets higher opacity,
- resetOpacityKeyCode: ```number``` - default is 51 which is 3 on keyboard - sets default opacity,
- opacityJump: ```float``` - default is 0.15 which means that opacity is chaning by 15%,
- defaultOpacity: ```float``` - default is 0.5 - default opacity value.

### How to change above settings?
Just make simple JS Object before you initialize Glitcher.
```
    var testImageOptions = {
        imageNameLikeSite: true,
        imageName: null,
        folderPath: '',
        fileExtension: 'jpg',
        alternateText: 'glitcher',
        pointerEvents: false,
        lowerOpacityKeyCode: 49,
        higherOpacityKeyCode: 50,
        resetOpacityKeyCode: 51,
        opacityJump: 0.15,
        defaultOpacity: 0.5
    }
```