import React, { useState, useRef } from "react";
import {
  PiListBulletsFill,
  PiListNumbersFill,
  PiCodeBlockBold,
  PiCodeBold,
  PiLinkBold,
  PiTextStrikethroughBold,
  PiTextItalicBold,
  PiTextBBold,
  PiTextAlignLeftBold,
  PiPlusLight,
  PiAtBold,
} from "react-icons/pi";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { Color } from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import "./ChattingInputArea.css";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { AddNewMessage } from "../services/service";

const ChattingInputArea = ({
  message,
  setMessage,
  userData,
  chatIdSelected,
  setChatData,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  // const [isFileUploading, setIsFileUploading] = useState(false);
  const fileInputRef = useRef(null);

  // const customEmojis = new Emoji();

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Placeholder.configure({
        placeholder: "Chat Goes here...",
      }),
    ],
    content: ``,
    editorProps: {
      attributes: {
        class: "h-10",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const onMessageSend = async () => {
    const html = editor.getHTML();
    console.log(html);
    const newMessage = {
      chatId: chatIdSelected,
      sentby: userData._id,
      message: html,
      messagetype: "text",
    };
    // setMessage(newMessage);
    await AddNewMessage(newMessage)
      .then((newpdatedchat) => {
        setChatData(newpdatedchat);
      })
      .catch((err) => {
        console.log("Err in updating newupdatedchat", err.message);
      });
  };

  const onEmojiSelect = (emoji) => {
    editor.chain().focus().insertContent(emoji.native).run();
    setShowPicker(false);
  };
  const onAddFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    setMessage({ type: "file", file });
    // setIsFileUploading(true);
  };

  // const onFileSend = () => {
  //   const file = event.target.files[0];
  //   setMessage({ type: "file", file });
  // };

  return (
    <div className="w-full h-full p-2 border-[1px] border-gray-200 rounded-xl flex flex-col">
      <div className="w-full flex space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "cursor-pointer pr-1 bg-gray-700"
              : "cursor-pointer pr-1 opacity-80 hover:opacity-100"
          }
        >
          <PiTextBBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "cursor-pointer pr-1 bg-gray-700"
              : "cursor-pointer pr-1 opacity-80 hover:opacity-100"
          }
        >
          <PiTextItalicBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "cursor-pointer pr-2 border-r-2 border-zinc-800 bg-gray-700"
              : "cursor-pointer pr-2 border-r-2 border-zinc-800 opacity-80 hover:opacity-100"
          }
        >
          <PiTextStrikethroughBold />
        </button>
        <button className="cursor-pointer pr-2 border-r-2 border-zinc-800 opacity-80 hover:opacity-100">
          <PiLinkBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "cursor-pointer pr-1 bg-gray-700"
              : "cursor-pointer pr-1 opacity-80 hover:opacity-100"
          }
        >
          <PiListBulletsFill />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "cursor-pointer pr-2 border-r-2 border-zinc-800 bg-gray-700"
              : "cursor-pointer pr-2 border-r-2 border-zinc-800 opacity-80 hover:opacity-100"
          }
        >
          <PiListNumbersFill />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "cursor-pointer pr-2 border-r-2 border-zinc-800 bg-gray-700"
              : "cursor-pointer pr-2 border-r-2 border-zinc-800 opacity-80 hover:opacity-100"
          }
        >
          <PiTextAlignLeftBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "cursor-pointer pr-1 bg-gray-700"
              : "cursor-pointer pr-1  opacity-80 hover:opacity-100"
          }
        >
          <PiCodeBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "cursor-pointer pr-1 bg-gray-700"
              : "cursor-pointer opacity-80 hover:opacity-100"
          }
        >
          <PiCodeBlockBold />
        </button>
      </div>
      <div className="flex-grow bg-inherit py-2 text-gray-300 outline-none">
        <EditorContent editor={editor} />
      </div>
      <div className="w-full flex space-x-2 items-center">
        <button
          onClick={onAddFileButtonClick}
          className="cursor-pointer p-1 rounded-full bg-gray-600 opacity-80 hover:opacity-100"
        >
          <PiPlusLight />
          <input
            type="file"
            className="hidden"
            onChange={onFileSelect}
            ref={fileInputRef}
          />
        </button>
        <div
          onClick={() => setShowPicker(!showPicker)}
          className="relative cursor-pointer px-2 border-l-2 border-zinc-800 opacity-80 hover:opacity-100 z-10"
        >
          <BsEmojiSmile />
          {showPicker && (
            <div className="absolute top-4 -left-1">
              <Picker data={data} onEmojiSelect={onEmojiSelect} />
            </div>
          )}
        </div>
        <button className="cursor-pointer flex-grow opacity-80 hover:opacity-100">
          <PiAtBold />
        </button>
        <button
          className="cursor-pointer bg-[#007a59c5] hover:bg-[#007a5a] disabled:bg-[#007a594d] rounded-md p-1 pr-5"
          onClick={onMessageSend}
          disabled={chatIdSelected === undefined}
        >
          <BiSolidSend />
        </button>
      </div>
    </div>
  );
};

export default ChattingInputArea;
