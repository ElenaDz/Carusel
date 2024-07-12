class ListItems {
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;
    }

    /**
     * @param {Item} Item
     */
    builder(Item)
    {
        this.$context.append(Item.getTemplate());
    }

    getWidthItem()
    {
        // fixme у jquery есть функцию width
        return this.$context.find('.item').first().css('width');
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