import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import noteActions from '../../redux/notes/actions';
import NoteList from './noteList';
import { ColorChoser } from '../../components/';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import NoteComponentWrapper from './noteComponent.style';
import { Textarea } from '../../components/uielements/input';

const { changeNote, addNote, editNote, deleteNote, changeColor } = noteActions;
const { Header, Content } = Layout;
class Notes extends Component {
  constructor(props) {
    super(props);
    this.updateNote = this.updateNote.bind(this);
  }
  updateNote(event) {
    const { editNote, selectedId } = this.props;
    editNote(selectedId, event.target.value);
  }
  render() {
    const {
      notes,
      selectedId,
      changeNote,
      deleteNote,
      addNote,
      colors,
      seectedColor,
      changeColor,
    } = this.props;
    const selectedNote =
      selectedId !== undefined
        ? notes.filter(note => note.id === selectedId)[0]
        : null;
    return (
      <NoteComponentWrapper className="isomorphicNoteComponent">
        <div style={{ width: '340px' }} className="isoNoteListSidebar">
          <NoteList
            notes={notes}
            selectedId={selectedId}
            changeNote={changeNote}
            deleteNote={deleteNote}
            colors={colors}
          />
        </div>
        <Layout className="isoNotepadWrapper">
          <Header className="isoHeader">
            {selectedId !== undefined ? (
              <div className="isoColorChooseWrapper">
                <ColorChoser
                  colors={colors}
                  changeColor={changeColor}
                  seectedColor={seectedColor}
                />{' '}
                <span>
                  <IntlMessages id="notes.ChoseColor" />
                </span>
              </div>
            ) : (
              ''
            )}
            <Button type="primary" className="isoAddNoteBtn" onClick={addNote}>
              <IntlMessages id="notes.addNote" />
            </Button>
          </Header>
          <Content className="isoNoteEditingArea">
            {selectedId !== undefined ? (
              <Textarea
                className="isoNoteTextbox"
                value={selectedNote.note}
                onChange={this.updateNote}
                autoFocus
              />
            ) : (
              ''
            )}
            {/*{selectedId !== undefined ? <span>{`created at ${selectedNote.createTime}`}</span> : ''}*/}
          </Content>
        </Layout>
      </NoteComponentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { notes, selectedId, colors, seectedColor } = state.Notes;
  return {
    notes,
    selectedId,
    colors,
    seectedColor,
  };
}
export default connect(
  mapStateToProps,
  {
    addNote,
    editNote,
    deleteNote,
    changeNote,
    changeColor,
  }
)(Notes);
