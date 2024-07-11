class ListItems {
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

    }

    builder(Item)
    {
        this.$context.append(Item.getTemplate());
    }

    getWidthItem()
    {
       return  this.$context.find('.item').first().css('width');
    }

    /**
     * @param {JQuery} $context
     * @return ListItems
     */
    static create($context)
    {
        return new ListItems($context.find('.inner_carousel'));
    }
}