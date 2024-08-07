class ListButtonSetPosition
{
    /** @type {JQuery} $context */
    $context;

    constructor($context)
    {
        this.$context = $context;
    }

    // fixme rename intiSetPosition
    offsetPosition()
    {
       let buttons_set_position = ButtonSetPosition.create(this.$context);

        buttons_set_position.forEach((button_set_position) =>
        {
            button_set_position.$context.on(ButtonSetPosition.SELECT_POSITION, () =>
            {
                let active_position = button_set_position.position;

                this.removeClassActive();

                button_set_position.active = true;

                // fixme разботай через обращение к свойствам объектов на не dom
                this.$context.parent().data('position', active_position);

                // fixme это событие не понадобиться если будешь работать через скойства Удали здесь и везде
                this.$context.trigger(ListButtonMovePosition.EVENT_UPDATE_CAROUSEL);
            });
        });
    }


    build(index)
    {
        this.$context.append(ButtonSetPosition.getTemplate(index));
    }

    // fixme rename setActive
    changeActiveSetPosition(active_position = 0)
    {
        // fixme у нас есть обекты ButtonSetPosition с методами active их и нужн использовать
        this.$context.find('.set_position.active').removeClass('active');

        this.$context.find(`[data-position=${active_position}]`).addClass('active');
    }

    // fixme rename resetActive
    removeClassActive()
    {
        this.$context.find('.set_position.active').removeClass('active');
    }


    static getTemplatePaginate()
    {
        return `
            <div class="pagination"></div>
        `;
    }


    /**
     * @param {JQuery} $context
     * @return ListButtonSetPosition
     */
    static create($context)
    {
        // fixme не совпадают имя класса и css класс так не должно быть исправь css класс
        // должно быть так класс ListButtonSetPosition css класс list_button_set_position
        // у тебя почти все класслы нарушают это правило исправь плиз везде
        return new ListButtonSetPosition($context.find('.pagination'));
    }
}