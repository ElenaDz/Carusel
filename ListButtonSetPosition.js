class ListButtonSetPosition
{
    /** @type {JQuery} $context */
    $context;

    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].ListButtonSetPosition) return;

        this.$context[0].ListButtonSetPosition = this;

        ButtonSetPosition.create(this.$context);
    }

    // fixme rename intiSetPosition ok

    build(items)
    {
        items.forEach((item, index) =>
        {
            this.$context.append(ButtonSetPosition.getTemplate(index));
        });
    }

    // fixme rename setActive ok
    setActive(active_position = 0)
    {
        let buttons_set_position = ButtonSetPosition.create(this.$context);

        buttons_set_position.forEach((button_set_position, index) =>
        {
            button_set_position.active = index === active_position;
        })
        // fixme у нас есть обекты ButtonSetPosition с методами active их и нужн использовать ok
    }

    // fixme rename resetActive ok

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
        // fixme не совпадают имя класса и css класс так не должно быть исправь css класс ok
        // должно быть так класс ListButtonSetPosition css класс list_button_set_position
        // у тебя почти все класслы нарушают это правило исправь плиз везде

        if ($context.find('.list_button_set_position').length === 0){
            $context.append(ListButtonSetPosition.getTemplatePaginate());
        }

        return new ListButtonSetPosition($context.find('.list_button_set_position'));
    }
}