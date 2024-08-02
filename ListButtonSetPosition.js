// fixme нельзя называть одно и тоже разными именами то у тебя ButtonSetPosition то просто SetPosition выбири одно имя ok
    class ListButtonSetPosition {

    /** @type {JQuery} $context */
    $context;

    constructor($context)
    {
        this.$context = $context;
    }


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


                this.$context.parent().data('position', active_position);

                this.$context.trigger(ListButtonMovePosition.EVENT_UPDATE_CAROUSEL);
            });
        });
    }


    // fixme имя метода это глагол ok
    build(index)
    {
        this.$context.append(ButtonSetPosition.getTemplate(index));
    }

    changeActiveSetPosition(active_position = 0)
    {
        this.$context.find('.set_position.active').removeClass('active');

        this.$context.find(`[data-position=${active_position}]`).addClass('active');
    }

    static getTemplatePaginate()
    {
        return `
            <div class="pagination"></div>
        `;
    }

    removeClassActive()
    {
        this.$context.find('.set_position.active').removeClass('active');
    }

    /**
     * @param {JQuery} $context
     * @return ListButtonSetPosition
     */
    static create($context)
    {
        return new ListButtonSetPosition($context.find('.pagination'));
    }
}