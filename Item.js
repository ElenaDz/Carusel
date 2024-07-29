class Item
{
    /** @type {JQuery} $context */
    $context;

    constructor($context)
    {
        this.$context = $context;

        // fixme этот класс все что делает это добавляет класс item который вроде не где больше не нужен кроме как в css
        // но и в css без него можно обойтись вместо .b_carousel .inner_carousel .item можно написать
        // .b_carousel .inner_carousel > div и избавиться от этого класса
        this.$context.addClass('item');
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