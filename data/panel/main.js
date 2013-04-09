!function() {

	var installEl =  document.querySelector('#new-app');

	installEl.addEventListener('click', function(e) {
		self.port.emit('install-app');
		e.stopPropagation();
  		e.preventDefault();
	})

}();