!function() {
	FFOS_RUNTIME.makeNavigatorShim('mozKeyboard', {
		onfocuschange: function() {
			console.log('keyboard onfocus change')
		}
	})
}()