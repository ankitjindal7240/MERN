import { DeleteIcon, PenSquareIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'
const NoteCard = ({ note,setNotes }) => {
  const HandleDelete = async (e,id) =>{
          e.preventDefault();
          console.log(id)
          if(window.confirm('are you sure you want to delete this note')){
            try {
              console.log(id)
              await api.delete(`/notes/${id}`)
              setNotes((prev) => prev.filter(note =>note._id != id))
              toast.success('deleted succesfully')

            } catch (error) {
              toast.error('unable to delete')
            }
          }
      }
  return (
    <Link to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>

        <p className="line-clamp-3 text-base-content/70">
          {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />

            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => HandleDelete(e,note._id)}>
              <TrashIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;