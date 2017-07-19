'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
Glitcher Plugin
Created by Piotr Kwiatek
*/

(function () {
    var Glitcher = function () {
        function Glitcher(opts) {
            _classCallCheck(this, Glitcher);

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

        _createClass(Glitcher, [{
            key: 'checkValues',
            value: function checkValues() {
                if (this.options.opacityJump >= 1 || this.options.opacityJump <= 0) {
                    throw new Error('Nieprawidłowa wartość zmiany właściwości Opacity.');
                }
                if (this.options.defaultOpacity >= 1 || this.options.defaultOpacity <= 0) {
                    throw new Error('Nieprawidłowa wartość domyślnej wartości właściwości Opacity.');
                }
            }
        }, {
            key: 'getCurrentAddress',
            value: function getCurrentAddress() {
                var tmp = window.location.pathname.split('/');
                this.address = tmp[tmp.length - 1].replace(/\.[^/.]+$/, "");
            }
        }, {
            key: 'setImage',
            value: function setImage() {
                this.image = document.createElement('img');
                this.image.alt = this.options.alternateText;
                if (this.options.imageNameLikeSite) {
                    this.image.src = this.options.folderPath + this.address + '.' + this.options.fileExtension;
                } else {
                    this.image.src = this.options.folderPath + this.options.imageName + '.' + this.options.fileExtension;
                }
                this.image.style.display = 'none';
                document.body.appendChild(this.image);
            }
        }, {
            key: 'setImageDefaultStyles',
            value: function setImageDefaultStyles() {
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
        }, {
            key: 'toggleImage',
            value: function toggleImage() {
                this.image.style.display = this.image.style.display === 'none' ? 'block' : 'none';
                this.active == false ? this.active = true : this.active = false;
            }
        }, {
            key: 'setToggleImageEvent',
            value: function setToggleImageEvent() {
                document.addEventListener('click', function () {
                    this.toggleImage();
                }.bind(this));
            }
        }, {
            key: 'setLowerOpacity',
            value: function setLowerOpacity() {
                if (this.active) {
                    if (parseFloat(this.image.style.opacity) > this.options.opacityJump) {
                        this.image.style.opacity = parseFloat(this.image.style.opacity) - this.options.opacityJump;
                    } else {
                        this.image.style.opacity = 0.05;
                    }
                }
            }
        }, {
            key: 'setHigherOpacity',
            value: function setHigherOpacity() {
                if (this.active) {
                    if (parseFloat(this.image.style.opacity) + this.options.opacityJump < 1) {
                        this.image.style.opacity = parseFloat(this.image.style.opacity) + this.options.opacityJump;
                    } else {
                        this.image.style.opacity = 1;
                    }
                }
            }
        }, {
            key: 'bindOpacityKeys',
            value: function bindOpacityKeys() {
                document.addEventListener('keydown', function () {
                    if (event.keyCode == this.options.lowerOpacityKeyCode) {
                        this.setLowerOpacity();
                    } else if (event.keyCode == this.options.higherOpacityKeyCode) {
                        this.setHigherOpacity();
                    } else if (event.keyCode == this.options.resetOpacityKeyCode) {
                        this.image.style.opacity = this.options.defaultOpacity;
                    }
                }.bind(this));
            }
        }]);

        return Glitcher;
    }();

    var glitcher = new Glitcher();
})();