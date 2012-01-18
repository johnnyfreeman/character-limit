;(function($){

    var characterLimit = function(field, limit)
    {
        this.field = $(field);

        if (typeof limit !== 'undefined')
        {
            this.limit = limit;
        };

        this.field.bind({
            'keypress.characterLimit': this.updateResponse.bind(this),
            'keyup.characterLimit': this.updateResponse.bind(this)
        });

        this.response = $('<div />').addClass('characterLimit_response').text(this.limit + ' Characters Remaining');
        this.field.after(this.response);
    };

    characterLimit.prototype.limit = 160; // default limit
    characterLimit.prototype.field = null;

    characterLimit.prototype.limitReached = function()
    {
        return (this.field.val().length + 1) > this.limit;
    };

    characterLimit.prototype.updateResponse = function()
    {
        var remaining = this.limit - this.field.val().length;

        if (remaining > 10)
        {
            this.response.removeClass('error');
        }
        else
        {
            this.response.addClass('error');
        };

        return this.response.text(remaining + ' Characters Remaining')
    };

    $.fn.characterLimit = function(limit)
    {
        return this.each(function()
        {
            return new characterLimit(this, limit);
        });
    };
     
     $(document).ready(function(){
         $('#tweet').characterLimit(10);
     });

})(jQuery);