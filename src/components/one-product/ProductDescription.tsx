import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Json } from "../../supabase/supabase";
interface Props {
  content: JSONContent | Json;
}
export const ProductDescription = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content as JSONContent,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none",
      },
    },
  });
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-center mb-8 underline">
        Descripción
      </h1>
      <div className="text-xs px-15 text-justify rounded-4xl ">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
