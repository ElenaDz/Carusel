class Item
{
    /** @type {JQuery} $context */
    $context;

    constructor($context)
    {
        this.$context = $context;

        this.$context.addClass('item');
    }

    /**
     * @param {JQuery} $context
     * @returns {Item[]}
     */
    static create($context) {
        let $items = $context.find('.inner_carousel').children();
        let items = [];
        $items.each((index, element) => {
            let $item = $(element);
            items.push(new Item($item));
        });
        return items;
    }
}