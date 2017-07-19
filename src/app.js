/* 
Glitcher Plugin
Created by Piotr Kwiatek
*/

(function() {

    class Glitcher {
        constructor(opts) {
            this.address = null;
            this.image = null;

            this.active = false;

            this.options = Object.assign({}, {
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
            }, opts);

            this.checkValues();

            this.getCurrentAddress();
            this.setImage();   
            this.setImageDefaultStyles();
            this.setToggleImageEvent();
            this.bindOpacityKeys();
        }

        checkValues() {
            if (this.options.opacityJump >= 1 || this.options.opacityJump <= 0) {
                throw new Error('Nieprawidłowa wartość zmiany właściwości Opacity.');
            }
            if (this.options.defaultOpacity >= 1 || this.options.defaultOpacity <= 0) {
                throw new Error('Nieprawidłowa wartość domyślnej wartości właściwości Opacity.');
            }
        }
        
        getCurrentAddress() {
            let tmp = window.location.pathname.split('/');
            this.address = tmp[tmp.length - 1].replace(/\.[^/.]+$/, "");
        }
        
        setImage() {
            this.image = document.createElement('img');
            this.image.alt = this.options.alternateText;
            if (this.options.imageNameLikeSite) {
                this.image.src = this.options.folderPath + this.address + '.' + this.options.fileExtension;
            }   
            else {
                this.image.src = this.options.folderPath + this.options.imageName + '.' + this.options.fileExtension;
            }
            this.image.style.display = 'none';
            document.body.appendChild(this.image);
        }

        setImageDefaultStyles() {
            this.image.style.position = 'absolute';
            this.image.style.top = '0';
            this.image.style.left = '50%';
            this.image.style.transform = 'translateX(-50%)';
            this.image.style.zIndex = '999';
            this.image.style.opacity = this.options.defaultOpacity;
            if (!this.options.pointerEvents) {
                this.image.style.pointerEvents = 'none';
            }
        }
        
        toggleImage() {
            this.image.style.display = this.image.style.display === 'none' ? 'block' : 'none';
            this.active == false ? this.active = true : this.active = false;
        }

        setToggleImageEvent() {
            document.addEventListener('click', function(){
                this.toggleImage();
            }.bind(this));
        }

        setLowerOpacity() {
            if (this.active) {
                if (parseFloat(this.image.style.opacity) > this.options.opacityJump) {
                    this.image.style.opacity = parseFloat(this.image.style.opacity) - this.options.opacityJump;
                }
                else {
                    this.image.style.opacity = 0.05;
                }
            }
        }

        setHigherOpacity() {
            if (this.active) {
                if (parseFloat(this.image.style.opacity) + this.options.opacityJump < 1) {
                    this.image.style.opacity = parseFloat(this.image.style.opacity) + this.options.opacityJump;
                }
                else {
                    this.image.style.opacity = 1;
                }
            }
        }

        bindOpacityKeys() {
            document.addEventListener('keydown', function() {
                if (event.keyCode == this.options.lowerOpacityKeyCode) {
                    this.setLowerOpacity();
                }
                else if (event.keyCode == this.options.higherOpacityKeyCode) {
                    this.setHigherOpacity();
                }
                else if (event.keyCode == this.options.resetOpacityKeyCode) {
                    this.image.style.opacity = this.options.defaultOpacity;
                }
            }.bind(this));
        }

    }

    const glitcher = new Glitcher();

})();
