import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import Quill from 'quilljs';
import 'quilljs/dist/quill.snow.css'
import './main.html';

function Editor() {
  this.quill = null
}

Template.editor.rendered =() =>
{
  console.log('before quill')
  console.log(Blaze.toHTML(Template.editor))
  var container = '#editor'
  console.log(container);
  this.quill = new Quill(container);
  console.log(this.quill)
}


Template.form.created = function () {
  this.editor = new Editor();
}

Template.form.helpers({
  editorInstance: function () {
    return Template.instance().editor;
  }
});

Editor.prototype.getTextAsHTML = function () {
  return this.quill && this.quill.getHTML();
}

Template.form.events({
  "submit form": function(e, tmpl) {
    e.preventDefault();
    var html = tmpl.editor.getTextAsHTML();
    // ...
  }
})

