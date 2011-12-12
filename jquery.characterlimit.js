;(function($){
    var characterLimit = function(field, options)
    {
        this.field = $(field);
        $.extend(this.options, options);

        this.field.bind({
            'keypress.characterLimit': this.keypressHandler.bind(this),
            'keyup.characterLimit': this.keyupHandler.bind(this)
        });

        this.response = $('<div />').attr('id', 'msg_response').text(this.options.limit + ' Characters Remaining');
        this.field.after(this.response);
    };

    characterLimit.prototype = {

	    options: {
	        limit: 160
	    },

        field: null,
        
        keypressHandler: function(e)
        {
            return this.updateResponse();
        },
        
        keyupHandler: function(e)
        {
            return this.updateResponse();
        },

        limitReached: function()
        {
        	return (this.field.val().length + 1) > this.options.limit;
        },

        updateResponse: function()
        {
        	var remaining = this.options.limit - this.field.val().length;

        	if (remaining > 10)
        	{
        		this.response.removeClass('error');
        	}
	        else
	        {
	        	this.response.addClass('error');
		    };

        	return this.response.text(remaining + ' Characters Remaining')
        }
    }

    characterLimit.options = characterLimit.prototype.options;

    $.fn.characterLimit = function(options) {
        return this.each(function() {
            return new characterLimit(this, options);
        });
    };
})(jQuery);