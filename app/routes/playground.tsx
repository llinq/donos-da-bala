import { createRef, DragEvent, DragEventHandler, useEffect, useState } from "react";
import Content from "~/components/Content";

const teams = [
  {
    name: 'Furia',
    sort: 0
  },
  {
    name: 'MIBR',
    sort: 1
  },
  {
    name: 'Imperial',
    sort: 2
  },
  {
    name: 'Pain',
    sort: 3
  },
  {
    name: '9z',
    sort: 4
  },
  {
    name: 'Red Canids',
    sort: 5
  },
  {
    name: 'Case',
    sort: 6
  },
  {
    name: 'Oddik',
    sort: 7
  },
  {
    name: 'G3X',
    sort: 8
  },
  {
    name: 'Paqueta',
    sort: 9
  }
];

export default function Playground() {
  // return (
  //   <div className="p-6 min-h-screen max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  //     <div className="shrink-0">
  //       <img className="size-12" src="/img/logo.svg" alt="ChitChat Logo" />
  //     </div>
  //     <div>
  //       <div className="text-xl font-medium text-black">ChitChat</div>
  //       <p className="text-slate-500">You have a new message!</p>
  //     </div>
  //   </div>
  // )

  const [orderedTeams, setOrderedTeams] = useState(teams);
  const listRef = createRef<HTMLOListElement>();

  useEffect(() => {
    if (!listRef?.current) {
      return;
    }

    // const listener = listRef.current.addEventListener('dragstart', (e) => {
    //   console.log('--- drag start', e);
    // })

    // return () => {
    //   listRef.current?.removeEventListener('dragstart');
    // }
  }, [listRef]);

  const getDragAfterElement = (
    container, y, x
  ) => {
    console.log('---- y', y);

    const draggableElements = [
      ...container.querySelectorAll(
        "li:not(.dragging)"
      ),];

    const allHeights = draggableElements.map((i) => i.getBoundingClientRect());

    console.log(allHeights.map((i, index) => ({
      offset: (i.top),
      name: draggableElements[index].innerText,
      offsetTop: draggableElements[index].offsetTop,
    })));

    const lastElement = allHeights.findIndex((i) => y < (i.top - (i.height / 3)));

    console.log(lastElement);

    return draggableElements[lastElement];



    const findElement = document.elementFromPoint(x, y);
    console.log(findElement);

    return draggableElements.reduce(
      (closest, child) => {
        const box =
          child.getBoundingClientRect();
        const offset =
          y - box.top - box.height / 2;
        if (
          offset < 0 &&
          offset > closest.offset) {
          return {
            offset: offset,
            element: child,
          };
        }
        else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    ).element;
  };

  const handleDragStart = (e) => {
    console.log('----- drag start', e);
  }

  const handleDragEnd = (e: DragEvent) => {
    if (!listRef.current) return;

    const draggableElements = [
      ...listRef.current.querySelectorAll(
        "li:not(.dragging)"
      ),] as HTMLElement[];



    console.log(e.clientY, draggableElements.map((i, index) => ({
      start: (i.offsetTop),
      end: i.offsetTop + 42,
      name: draggableElements[index].innerText,
      offsetTop: draggableElements[index].offsetTop,
    })));

    const map = draggableElements.map((i, index) => ({
      start: (i.offsetTop),
      end: i.offsetTop + 42 + 10, // top + 42 (team height) + 10 (gap between list items)
      name: draggableElements[index].innerText,
      offsetTop: draggableElements[index].offsetTop,
    }));

    const newIndex = map.findIndex((m) => m.start <= e.clientY && m.end >= e.clientY);

    const elementDragged = e.target as HTMLElement;
    const previousIndex = map.findIndex((o) => o.name === elementDragged.innerText);

    // draggableElements[newIndex].innerText = elementDragged.innerText;

    const newOrderedTeams = orderedTeams.map((item, index) => {
      console.log('index', previousIndex, index, newIndex);

      if (item.name === elementDragged.innerText) {
        item.sort = newIndex
        console.log('-- team', item.name, item.sort);
      } else if ((newIndex > previousIndex && newIndex >= index) || (newIndex < previousIndex && newIndex > index)) {
        item.sort -= 1;
      } else if (newIndex > previousIndex && (newIndex < index) || (newIndex < previousIndex && newIndex <= index)) {
        item.sort += 1;
      }

      return item;
    }).sort((a, b) => a.sort - b.sort).map((item, index) => ({
      ...item,
      sort: index
    }));

    console.log('FINAL', newOrderedTeams);

    setOrderedTeams([...newOrderedTeams]);

    // console.log('xxx', e.clientY, listRef.current?.offsetTop * 2);

    // const elementDragged = e.target as HTMLElement;
    // const afterElementDragged = getDragAfterElement(listRef.current, e.clientY, e.clientX) as HTMLElement;

    // const draggableIndex = orderedTeams.findIndex((o) => o.name === elementDragged.innerText);

    // const afterDraggableIndex = orderedTeams.findIndex((o) => o.name === afterElementDragged.innerText);

    // orderedTeams[draggableIndex].sort = afterDraggableIndex - 1;
    // orderedTeams[afterDraggableIndex - 1].sort -= 1;

    // const newOrderedTeams = orderedTeams.sort((a, b) => a.sort - b.sort);

    // setOrderedTeams([...newOrderedTeams]);
  }

  const handleDragOver = (e: DragEvent) => {
    // console.log('----- drag over', e);
  }

  return (
    <Content>
      <section className="border-orange-950 border margin rounded-md mt-4 p-4 ranking">
        <h1>
          Ranking
        </h1>
        <ol type="A" className="[&>li]:border-slate-700 [&>li]:border [&>li]:rounded-lg w-1/2" ref={listRef}>
          {orderedTeams.sort((a, b) => a.sort - b.sort).map((team) => (
            <li draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd} >{team.name}</li>
          ))}
        </ol>
      </section>
      <section className="border-orange-950 border margin rounded-md mt-4 p-4">
        <h1>
          Votação
        </h1>
        <div className="w-full h-32 flex items-center justify-center gap-6 mt-4">
          <div className="border-orange-950 border min-h-full flex-1 min-w-16">
            card 1
          </div>
          <div className="border-orange-950 border min-h-full flex-1  min-w-16">
            card 2
          </div>
          <div className="border-orange-950 border min-h-full flex-1  min-w-16">
            card 1
          </div>
          <div className="border-orange-950 border min-h-full flex-1  min-w-16">
            card 2
          </div>
          <div className="border-orange-950 border min-h-full flex-1  min-w-16">
            card 1
          </div>
          <div className="border-orange-950 border min-h-full flex-1  min-w-16">
            card 2
          </div>
        </div>
      </section>
      <div className="flex justify-end mt-5">
        <button type="button" className="bg-orange-600 p-2 rounded-lg">
          Enviar
        </button>
      </div>
    </Content>
  )
}
