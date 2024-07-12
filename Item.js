class Item
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;
    }


    getTemplate()
    {
        this.$context.addClass('item');
        return this.$context;
    }

    /**
     * @param {JQuery} $context
     * @returns {Item[]}
     */
    static create($context) {
        let $items = $context.children();
        let items = [];
        $items.each((index, element) => {
            let $item = $(element);
            items.push(new Item($item));
        });
        return items;
    }
}