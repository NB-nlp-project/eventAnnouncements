var $sortableTable = new Class({
						  
	options: {
		onClick: false,
		sortOn: 0,
		sortBy: 'ASC'
	},

	initialize: function(tHead,tBody, options){
		this.setOptions(options);
		this.tHead = $(tHead);
		this.tBody = $(tBody);
		this.elements = this.tBody.getElements('tr');
		
		
		this.elements.each(function(el,i){
			if(this.options.onClick){
				el.addEvent('click', options.onClick);
			}
		}, this);
		
		this.tHead.getElements('td').each(function(el,i){
			if(el.axis){
				el.getElement("a").addEvent('click', this.sort.bind(this,i));

				el.findData = function(elem){
					var child = elem.getFirst();
					if(child){
						return el.findData(child);
					}else{
						return elem.innerHTML.trim();
					}
				};
				//
				el.compare = function(a,b){
					var1 = el.findData(a.getChildren()[i]);
					var2 = el.findData(b.getChildren()[i]);
					
					if(el.axis == 'number'){
						var1 = parseFloat(var1);
						var2 = parseFloat(var2);
						
						if(el.sortBy == 'ASC'){
							return var1-var2;
						}else{
							return var2-var1;
						}
						
					}else if(el.axis == 'string'){
						var1 = var1.toUpperCase();
						var2 = var2.toUpperCase();
						
						if(var1==var2){return 0};
						if(el.sortBy == 'ASC'){
							if(var1<var2){return -1};
						}else{
							if(var1>var2){return -1};
						}
						return 1;
						
					}
					
				}
				
				if(i == this.options.sortOn){
					el.fireEvent('click');
				}
			}
		}, this);
	},
	
	sort: function(index){
		if(this.options.onStart){
			this.fireEvent('onStart');
		}
		this.options.sortOn = index;
		var header = this.tHead.getElements('td'), el = header[index];
		
		if(el.retrieve("flag") == true){
			el.store("flag", false);
			el.sortBy = 'DESC';
		}else if(el.retrieve("flag") == false){
			el.store("flag", true);
			el.sortBy = 'ASC';
		}else{
			if(this.options.sortBy == 'ASC'){
				el.store("flag", true);
				el.sortBy = 'ASC';
			}else if(this.options.sortBy == 'DESC'){
				el.store("flag", false);
				el.sortBy = 'DESC';
			}
		}

		this.elements.sort(el.compare);
		this.elements.injectInside(this.tBody);
		
		if(this.options.onComplete){
			this.fireEvent('onComplete');
		}
	}

});
$sortableTable.implement(new Events);
$sortableTable.implement(new Options);