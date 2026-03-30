import { request } from "express"
import Note from "../models/Note.js"


export async function getAllNotes(_,res) {
try{
    const notes = await Note.find().sort({createdAt : -1})
    res.status(200).json(notes)
} catch (error){
res.status(500).json({message:"internal server error"})
}}

export async function getNote(req,res) {
try{
    const note = await Note.findById(req.params.id)
    res.status(200).json(note)
} catch (error){
res.status(500).json({message:"internal server error"})
}}

export async function creatNotes(req,res){
    try{
        const {title,content} = req.body
        const newNote = new Note({title,content})
        await newNote.save()
        res.status(201).json({message : "new note created "})
        } 
    catch (error){
    console.log(error)
    res.status(500).json({message:"internal server error"})
}  
}

export async function updateNotes(req,res){
    try{
        const {title,content} = req.body
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
        {
            new : true
        })
        if (!updateNote) return res.status(404).json({message : "Note not found"})
        res.status(200).json({message : "note updated "})
        } 
    catch (error){
    console.log(error)
    res.status(500).json({message:"internal server error"})
} }

export async function deleteNotes(req,res){
        try{
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) return res.status(404).json({message : "Note not found"})
        res.status(200).json({message : "note deleted "})
        } 
    catch (error){
    console.log(error)
    res.status(500).json({message:"internal server error"})
}}