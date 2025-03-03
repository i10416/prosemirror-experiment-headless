import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
const schema = new Schema({
	nodes: {
		doc: {
			content: "note+", // The grammar ProseMirror follows to "parse"s inputs
		},
		note: {
			content: "text*", // Any node with content is supposed to be Block(?)
			toDOM: (_) => [
				"https://example.com/dom/namespace/prefix name", // The tag name of element
				{ kind: "note" }, // The second element is DOM attributes if it is JS object
				0, // The placeholder indicating that it has children inside this node
			],
		},
		text: {},
	},
});
const state = EditorState.create({
	schema: schema,
});
const tx = state.tr.insertText(
	"This is a ProseMirror editor without plugins " +
		"built mainly for understanding its data flow. " +
		"I'm not sure why, but you need to hit `Enter` twice " +
		"and move a cursor down when you are at the end of paragraph.",
);
export const initialState = state.apply(tx);
