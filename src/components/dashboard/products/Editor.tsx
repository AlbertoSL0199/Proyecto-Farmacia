import { EditorContent, JSONContent, useEditor, type Editor as EditorType } from "@tiptap/react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { ProductFormValues } from "../../../lib/validator";
import StarterKit from "@tiptap/starter-kit";
import { ReactNode } from "react";

interface Props {
  setValue: UseFormSetValue<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  initialContent?: JSONContent;
}

export const MenuBar = ({
	editor,
}: {
	editor: EditorType | null;
}) => {
	const buttonClass = (isActive: boolean) =>
		`h-8 p-1  grid place-items-center border text-sm rounded transition-all ${
			isActive
				? 'border-blue-500 bg-blue-100 text-blue-700'
				: 'border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
		}`;

	if (!editor) {
		return null;
	}

	return (
		<div className='flex flex-wrap gap-5'>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
				className={buttonClass(
					editor.isActive('heading', { level: 1 })
				)}
				type='button'
			>
				Encabezado 1
			</button>

			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
				className={buttonClass(
					editor.isActive('heading', { level: 2 })
				)}
				type='button'
			>
				Encabezado 2
			</button>

			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				}
				className={buttonClass(
					editor.isActive('heading', { level: 3 })
				)}
				type='button'
			>
				Encabezado 3
			</button>

			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={buttonClass(editor.isActive('bold'))}
				type='button'
			>
				Negrita
			</button>

			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={buttonClass(editor.isActive('italic'))}
				type='button'
			>
				Cursiva
			</button>

			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={buttonClass(editor.isActive('strike'))}
				type='button'
			>
				Subrayado
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={buttonClass(editor.isActive('bulletlist'))}
				type='button'
			>
				Enlistado
			</button>
		</div>
	);
};


export const Editor = ({ setValue, errors, initialContent }: Props) => {
const editor =useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate:({editor}) =>{
        //se actualiza el valor del campo "description.content en el formulario"

        const content = editor.getJSON();

        setValue("description", content, {shouldValidate:true})
    },
    editorProps:{
        attributes: {
            class: "focus:outline-none min-h.[150px] prose prose-s, sm:prose-base"
        }
    }
})

  return (
    <div className="space-y-3">
        <MenuBar editor={editor} />
      <EditorContent editor={editor}/>

      {
        errors.description && (
            <p className="text-red-500 text-xs mt-1" >
                {(errors.description.message as ReactNode) || "Debe escribir una descripcion"} 
            </p>
        )
      }
    </div>
  );
};
