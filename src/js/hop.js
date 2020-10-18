(function(window){
    "use strict";
    
    var hop_Collection;
    
    window.Hop = (function(){
        var hopCount = 0;

        /* shadow object */
        var shadow = {
            duration : ".5",
            color : "rgba(0, 0, 0, 0.7)",
            isShadowed: false,
            open: function(){
                if(hopCount === 0){
                    hop_Collection.style.transitionDuration = this.duration + "s";
                    hop_Collection.style.backgroundColor = this.color;
                    hop_Collection.style.zIndex = "999";
                }
            },
            close: function(){
                if(hopCount === 0){
                    hop_Collection.style.transitionDuration = this.duration + "s";
                    hop_Collection.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
                    hop_Collection.addEventListener("transitionend", function(){
                        hop_Collection.style.zIndex = "-999";
                    });
                }
            }
        };
        var eventMapping = function(div, index, events){
            var self = this;
            div.getElementsByClassName(events[index].class)[0]
                .addEventListener("click", function(e){
                    events[index].event.bind(self)();
                });
        }
        
        return {
            add: function({name, body, events}, effect){
                /* popup object */
                this[name] = new (function(){
                    var self = this;
                    var isOpened = false;
                    effect = (effect || {animation: "", duration: ".2"});

                    this.open = function(time, callback){
                        if(isOpened === false){
                            shadow.open();
                            
                            if(time != undefined){
                                setTimeout(function(){
                                    self.close();
                                    callback();
                                }, time);
                            }

                            var div = document.createElement("div");
                            div.classList.add("Hop");
                            div.setAttribute("id", name);
                            div.innerHTML = body;
                            if(events != undefined){
                                for(var i=0; i<events.length; i++){
                                    eventMapping.bind(self)(div, i, events);
                                }
                            }

                            hop_Collection.appendChild(div);
                            div.style.left = "calc(50% - "+(div.offsetWidth/2)+"px)";
                            div.style.top = "calc(50% - "+(div.offsetHeight/2)+"px - 50px)";
                            div.style.transitionDuration = effect.duration + "s";

                            switch(effect.animation){
                                case "Jump":
                                    div.style.animationName = "Jump-Open";
                                    div.style.animationDuration = effect.duration + "s";
                                    div.style.animationPlayState = "running";
                                    break;
                                default:
                                    break;
                            }

                            div.style.opacity = 1;
                            
                            hopCount += 1;
                            isOpened = true;
                        }
                    }
                    this.close = function(){
                        if(isOpened === true){
                            hop_Collection.removeChild(document.getElementById(name));
                            hopCount -= 1;
                            isOpened = false;
                            shadow.close();
                        }
                    }
                })();
            },
            remove: function(name){
                if(name != undefined && this.hasOwnProperty(name)){
                    delete this[name];
                }
            },
            setShadow: function(duration, color){
                shadow.duration = (duration || ".2");
                shadow.color = (color || "rgba(0, 0, 0, 0.7)");
            }
        }
    })();
    
    window.onload = function(){
        hop_Collection = document.createElement("div");
        hop_Collection.setAttribute("id", "Hop-Collection");
        document.body.appendChild(hop_Collection);
    }
})(window);