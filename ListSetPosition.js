class ListSetPosition {

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;
    }

    builder(index)
    {
        this.$context.append(ButtonSetPosition.getTemplate(index));
    }

    changeActiveSetPosition(active_position)
    {
        this.$context.find('.set_position.active').removeClass('active');

        this.$context.find(`[data-position=${active_position}]`).addClass('active');
    }

    getActivePosition()
    {
        return this.$context.find('.active').data('position');
    }

    static getTemplatePaginate()
    {
        return `
                <div class="pagination"></div>
        `;
    }

    /**
     * @param {JQuery} $context
     * @return ListSetPosition
     */
    static create($context)
    {
        return new ListSetPosition($context.find('.pagination'));
    }
}