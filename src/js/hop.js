(function(window){
    "use strict";
    
    var hop_Collection;
    
    window.Hop = (function(){
        var isLoaded = false; // check onload state

        var popupCache = []; // store popup data when before onload 
        var hopCount = 0; // alive popup data count

        /* shadow object */
        var shadow = {
            duration : ".5",
            color : "rgba(0, 0, 0, 0.7)",
            open: function(){
                if(hopCount === 0){
                    hop_Collection.style.transitionDuration = this.duration + "s";
                    hop_Collection.style.backgroundColor = this.color;
                    hop_Collection.style.zIndex = "999"; // for first queue draw & block button interaction
                }
            },
            close: function(){
                if(hopCount === 0){
                    hop_Collection.style.transitionDuration = this.duration + "s";
                    hop_Collection.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
                    hop_Collection.addEventListener("transitionend", function(){
                        hop_Collection.style.zIndex = "-999";
                    }, {once: true});
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
            initialize: function(){
                isLoaded = true;
                for(var i=0; i<popupCache.length; i++){
                    popupCache[i].self.open(popupCache[i].time, popupCache[i].callback);
                }
                popupCache.length = 0;
            },
            add: function({name, body, events}, effect){
                if(name === undefined) return; // name is not null
                body = body || "내용 없음";

                /* popup object */
                this[name] = new (function(){
                    var self = this;
                    var blocked = false; // blocking unsual apphroach
                    var isOpened = false;
                    var popupTemplate = null;

                    /* safety 'effect object' data setter */
                    if(effect === undefined){
                        effect = {};
                        effect.animation = {
                            open: "",
                            close: ""
                        }
                        effect.duration = ".2";
                    }
                    else{
                        if(effect.animation === undefined){
                            effect.animation = {
                                open: "",
                                close: ""
                            };
                        }
                        else{
                            if(typeof(effect.animation) == "string"){
                                var animationType = effect.animation;
                                effect.animation = {};
                                effect.animation.open = animationType;
                                effect.animation.close = animationType;
                            }
                            else{
                                effect.animation.open = effect.animation.open || "";
                                effect.animation.close = effect.animation.close || "";
                            }
                        }
                        effect.duration = effect.duration || ".2";
                    }

                    this.open = function(time, callback){
                        if(isLoaded === false){
                            popupCache.push({self, time, callback});
                            return;
                        }
                        if(isOpened === false && blocked === false){
                            shadow.open();
                            
                            if(time != undefined){
                                setTimeout(function(){
                                    self.close();
                                    callback();
                                }, time);
                            }

                            popupTemplate = document.createElement("div");
                            popupTemplate.classList.add("Hop");
                            popupTemplate.setAttribute("id", name);
                            popupTemplate.innerHTML = body;
                            if(events != undefined){
                                for(var i=0; i<events.length; i++){
                                    eventMapping.bind(self)(popupTemplate, i, events);
                                }
                            }

                            hop_Collection.appendChild(popupTemplate);
                            popupTemplate.style.left = "calc(50% - "+(popupTemplate.offsetWidth/2)+"px)";
                            popupTemplate.style.top = "calc(50% - "+(popupTemplate.offsetHeight/2)+"px - 50px)";
                            // popupTemplate.style.transitionDuration = effect.duration + "s";

                            switch(effect.animation.open){
                                case "":
                                    break;
                                default:
                                    popupTemplate.style.animationName = "Hop-"+effect.animation.open+"-Open";
                                    popupTemplate.style.animationDuration = effect.duration + "s";
                                    popupTemplate.style.animationPlayState = "running";
                                    break;
                            }

                            popupTemplate.style.opacity = 1;
                            
                            hopCount += 1;
                            isOpened = true;
                        }
                    }
                    this.close = function(){
                        if(isOpened === true && blocked === false){
                            isOpened = false;
                            blocked = true;
                            
                            switch(effect.animation.close){
                                case "":
                                    blocked = false;
                                    hop_Collection.removeChild(document.getElementById(name));
                                    break;
                                default:
                                    popupTemplate.style.animationName = "Hop-"+effect.animation.close+"-Close";
                                    popupTemplate.style.animationDuration = effect.duration + "s";
                                    popupTemplate.style.animationPlayState = "running";

                                    popupTemplate.addEventListener("animationend", function(){
                                        blocked = false;
                                        hop_Collection.removeChild(document.getElementById(name));
                                    }, {once: true});
                                    break;
                            }

                            hopCount -= 1;
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

        window.Hop.initialize();
    }
})(window);