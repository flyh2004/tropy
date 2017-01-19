'use strict'

const React = require('react')
const { Component, PropTypes } = React
const { ListNode } = require('./node')
const { connect } = require('react-redux')
const { GetChildNodes } = require('../../selectors/list')
const { create, save } = require('../../actions/list')
const ui = require('../../actions/ui')


class ListTree extends Component {

  renderNewListNode() {
    const { editing, parent, onEditCancel } = this.props

    if (!editing || editing.parent !== parent) return null

    return (
      <ListNode list={editing} isEditing onEditCancel={onEditCancel}/>
    )
  }

  render() {
    const {
      lists, selected, editing, context, ...props
    } = this.props


    return (
      <ol className="lists">
        {
          lists.map(list =>
            <ListNode {...props}
              key={list.id}
              list={list}
              isSelected={selected === list.id}
              isEditing={editing && editing.id === list.id}
              isContext={context === list.id}/>)
        }
        {this.renderNewListNode()}
      </ol>
    )
  }

  static propTypes = {
    parent: PropTypes.number.isRequired,

    lists: PropTypes.array,
    selected: PropTypes.number,
    context: PropTypes.number,
    editing: PropTypes.object,

    onEdit: PropTypes.func,
    onEditCancel: PropTypes.func,

    onUpdate: PropTypes.func,
    onSelect: PropTypes.func,

    onContextMenu: PropTypes.func
  }
}

module.exports = {
  ListTree: connect(

    () => {
      const getChildNodes = GetChildNodes()

      return (state, props) => ({
        selected: state.nav.list,
        context: state.ui.context.list,
        editing: state.ui.edit.list,
        lists: getChildNodes(state, props)
      })
    },

    (dispatch, props) => ({
      onUpdate(id, values) {
        dispatch(ui.edit.cancel())
        dispatch(id ?
          save({ id, ...values }) :
          create({ ...values, parent: props.parent }))
      }
    })

  )(ListTree)
}