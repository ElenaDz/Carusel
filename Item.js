class Item
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;
    }

    get index()
    {
        return this.$context.data('index');
    }

    setActive(position)
    {
        if (this.index === position) {
            this.$context.addClass('active');
        }
    }

    removeClassActive()
    {
       this.$context.removeClass('active');
    }

    /**
     * @param {JQuery} $context
     * @returns {Item[]}
     */
    static create($context) {
        let $items = $context.find('.item');
        let items = [];
        $items.each((index, element) => {
            let $item = $(element);
            items.push(new Item($item));
        });
        return items;
    }
}