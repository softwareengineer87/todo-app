
import { Todo } from '@/models/Todo';
import './form-todo.css';
import { useEffect } from 'react';

interface FormTodoProps {
  onChange(todo: Partial<Todo>): void;
  todo: Partial<Todo>;
  save(): void;
  cancell(): void;
}

function FormTodo({
  onChange,
  todo,
  save,
  cancell
}: FormTodoProps) {

  const prioritys = ['baixa', 'media', 'alta'];

  useEffect(() => {
    console.log(todo);
  }, [todo]);

  return (
    <section className='container-form'>
      <div className='form-todo'>
        <form>
          <div className='input-form'>
            <label>Titulo</label>
            <input
              value={todo?.title}
              type='text'
              placeholder='titulo da tarefa'
              onChange={(e) => onChange({ ...todo, title: e.target.value })}
            />
          </div>
          <div className='input-form'>
            <label>Description</label>
            <textarea
              value={todo?.description}
              placeholder='Descrição da tarefa'
              onChange={(e) => onChange({ ...todo, description: e.target.value })}
            >

            </textarea>
          </div>
          <div className='input-form'>
            <label>Prioridade</label>
            <select
              value={todo?.priority}
              onChange={(e) => onChange({ ...todo, priority: e.target.value })}
            >
              <option disabled selected>Selecione a prioridade</option>
              {prioritys.map((p, i) => (
                <option key={i}>{p}</option>
              ))}
            </select>
          </div>
          <div className='input-form'>
            <label>Tag</label>
            <input
              value={todo?.tag}
              type='text'
              placeholder='ex: trabalho | estudos | pessoal'
              onChange={(e) => onChange({ ...todo, tag: e.target.value })}
            />
          </div>
          <div className='input-form'>
            <label>Data</label>
            <input
              value={todo?.date}
              type='date'
              placeholder='titulo da tarefa'
              onChange={(e) => onChange({ ...todo, date: e.target.value })}
            />
          </div>
          <div className='input-form'>
            <label>Hora</label>
            <input
              value={todo?.hour}
              type='time'
              placeholder='hora da tarefa'
              onChange={(e) => onChange({ ...todo, hour: e.target.value })}
            />
          </div>
        </form>
        <div className='buttons'>
          <button
            onClick={save}
            className='btn-save'
          >
            Salvar !!!
          </button>
          <button
            className='btn-cancell'
            onClick={cancell}
          >
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}

export { FormTodo }

