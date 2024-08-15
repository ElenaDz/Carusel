class ListItems {
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].ListItems) return;

        this.$context[0].ListItems = this;
    }

    getWidthItem()
    {
        return this.$context.find('.item').first().width() + 2;
    }

    getCountItems()
    {
        return this.$context.find('.item').length - 1;
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