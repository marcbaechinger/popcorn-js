document.addEventListener("DOMContentLoaded", function () {
if (Popcorn) {
                //intercept all existing plugins
                var instances = new Array(Popcorn.instances);
                for (var i=0; i < instances.length; i++) {
					console.log(instances);
                    var inst = instances[i];
                    console.log(inst);
                    inst.bubbleWrap = {};
                    inst.bubbleWrap.createObserver = function(plugin,evt_name) {
                        
                        var name = plugin.type;
                        var old_fn = plugin[evt_name];
                       
			if (!plugin._bubblewrap) {          
  	                      plugin[evt_name] = function(a,b) { 
        	                
                	            console.log("TRIGGER - " + name + "_" + evt_name, a, b);
    							this.trigger(name + "_" + evt_name, [a,b]);
                            
                        	    old_fn(a,b);
                       	 	};
				plugin.bubblewrap = true;
			};                    
                    
                    };
            
                   //this will wrap the base for new plugin instances added later 
                    for (var r=0; r < Popcorn.registry.length; r++) {
                        Popcorn.registry[r].base.type = Popcorn.registry[r].type;
                        inst.bubbleWrap.createObserver(Popcorn.registry[r].base,"start");
                        inst.bubbleWrap.createObserver(Popcorn.registry[r].base,"end");
                        inst.bubbleWrap.createObserver(Popcorn.registry[r].base,"_setup");
                        inst.bubbleWrap.createObserver(Popcorn.registry[r].base,"_teardown");
                    }
                    
                    //this will capture plugins already loaded
                   	var trackEvents = inst.getTrackEvents();
                    for (var it=0; it < trackEvents.length; it++) {
                        inst.bubbleWrap.createObserver(trackEvents[it]._natives,"start");
                        inst.bubbleWrap.createObserver(trackEvents[it]._natives,"end");  
                        inst.bubbleWrap.createObserver(trackEvents[it]._natives,"_setup");  
                        inst.bubbleWrap.createObserver(trackEvents[it]._natives,"_teardown");  
                    }
                }
                
            };
});