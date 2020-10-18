(function(window){
    "use strict";
    
    var hop_Collection;
    
    window.Hop = (function(){
        var hopCount = 0;
        var shadow = {
            isShadowed: false,
            open: function(){
                if(hopCount === 0){
                    hop_Collection.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                    hop_Collection.style.transitionDuration = ".2s";
                    hop_Collection.style.zIndex = "999";
                }
            },
            close: function(){
                if(hopCount === 0){
                    hop_Collection.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
                    hop_Collection.style.transitionDuration = ".2s";
                    setTimeout(function(){
                        hop_Collection.style.zIndex = "-999";
                    }, 200);
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
            add: function(param){
                this[param.name] = new (function(name, body, events){
                    var self = this;
                    var isOpened = false;

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
                                for(var i=0;i<events.length;i++){
                                    eventMapping.bind(self)(div, i, events);
                                }
                            }

                            hop_Collection.appendChild(div);
                            div.style.top = "calc(50% - "+(div.offsetHeight/2)+"px - 50px)";
                            div.style.transitionDuration = "10s";
                            div.style.opacity = 1;
                            
                            hopCount += 1;
                            isOpened = true;
                        }
                    }
                    this.close = function(){
                        if(isOpened === true){
                            hop_Collection.removeChild(document.getElementById(param.name));
                            hopCount -= 1;
                            isOpened = false;
                            shadow.close();
                        }
                    }
                })(param.name, param.body, param.events);
            },
            remove: function(name){
                if(name != undefined && this.hasOwnProperty(name)){
                    delete this[name];
                }
            }
        }
    })();
    
    window.onload = function(){
        hop_Collection = document.createElement("div");
        hop_Collection.setAttribute("id", "Hop-Collection");
        document.body.appendChild(hop_Collection);
    }
})(window);