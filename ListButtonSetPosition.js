class ListButtonSetPosition
{
    /** @type {JQuery} $context */
    $context;

    /** @type {Carousel} carousel */
    carousel;

    /** @type {Item[]} items */
    items;

    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].ListButtonSetPosition) return;

        this.$context[0].ListButtonSetPosition = this;

        ButtonSetPosition.create(this.$context);

        this.carousel = Carousel.create();

        this.items = Item.create(this.carousel.$context);

        this.build(this.items)
    }


    build(items)
    {
        items.forEach((item, index) =>
        {
            this.$context.append(ButtonSetPosition.getTemplate(index));
        });
    }


    setActive(active_position = 0)
    {
        let buttons_set_position = ButtonSetPosition.create(this.$context);

        // fixme сколько можно говорить что нужно строго следить за тем что Ide должна понимать все типы ok
        // у тебя phpsrtorm понимает тип button_set_position? у меня нет ( у меня понимает, поэтому я не увидела проблему)
        buttons_set_position.forEach((/** ButtonSetPosition */ button_set_position, index) =>
        {
            button_set_position.active = index === active_position;
        })
    }

    static getTemplatePaginate()
    {
        return `
            <div class="list_button_set_position"></div>
        `;
    }

    /**
     * @param {JQuery} $context
     * @return ListButtonSetPosition
     */
    static create($context)
    {
        if ($context.find('.list_button_set_position').length === 0){
            $context.append(ListButtonSetPosition.getTemplatePaginate());
        }

        return new ListButtonSetPosition($context.find('.list_button_set_position'));
    }
}