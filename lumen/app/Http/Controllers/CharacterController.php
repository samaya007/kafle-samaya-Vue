<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Character;


class CharacterController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */

     public function getAll() {
        $character = Character::select('name','description','image')
                     ->orderBy('created_at')
                     ->get();
        return response()->json($character);
    }
    

    //  public function getOne($id) {
    //     $book = Book::join('authors', 'books.author_id', '=', 'authors.id')
    //     ->where('books.id','=',$id)
    //     ->get();
    //     return response()->json($book);
        

    //  }

    //  public function save(Request $request) {
    //     $this->validate($request, [
    //         'title' => 'required',
    //         'author_id' => 'required',
    //         'published_date' => 'required|date',
    //         'book_image' => 'required'
    //     ]);
    //     $book = Book::create($request->all());
    //     return response()->json($book, 201);
    // }

    // public function update(Request $request, $id) {
    //     $this->validate($request, [
    //         'title' => 'required',
    //         'author_id' => 'required',
    //         'published_date' => 'required|date',
    //         'book_image' => 'required'
    //     ]);
    //     $book = update($request->all());
    //     return response()->json($book);
    // }
    
    
    
    // public function delete($id) {
    //     $book = Book::findOrFail($id);
    //     $book->delete();
    //     return response()->json(null, 204);
    // }
    

}