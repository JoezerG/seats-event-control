<script lang="ts">
  import type { ReserveData } from "../stores/reserve";

  export let zone;
  export let onclick;
  export let selected: ReserveData;
  const { id, name, columns, rows, seats, floor } = zone;
  const _seats = Array(seats)
    .fill({})
    .map((_, i) => {
      const seatNumber = i + 1;
      const seatId = `${id}-${seatNumber}`;
      return { seatId, seatNumber };
    });
</script>

<div
  {id}
  data-zonename={`Zona ${name}`}
  class={[
    "zone",
    `columns-${columns}`,
    `rows-${rows}`,
    `f-${floor}`,
    `${selected.seatZone === name && "selected"}`,
  ].join(" ")}
>
  {#each _seats as { seatId, seatNumber }}
    <button
      id={seatId}
      class={[
        "seat",
        `${selected.seatNumber === seatNumber.toString() && selected.seatZone === name && "selected"}`,
      ].join(" ")}
      on:click={() => onclick(name, seatNumber)}
    >
      {seatNumber}
    </button>
  {/each}
</div>

<style lang="scss">
  .zone {
    background-color: var(--bulma-primary-45);
    color: white;
    display: grid;
    gap: 3px;
    padding: 5px;
    position: relative;

    &.selected {
      background-color: var(--bulma-warning-50);
    }

    &::before {
      content: attr(data-zonename);
      position: absolute;
      top: -25px;
      left: 0;
      right: 0;
      height: 25px;
      background-color: var(--bulma-primary-15);
      padding: 0 10px;
      font-weight: bold;
    }
  }

  .seat {
    width: 100%;
    height: 100%;
    background-color: #ffe5d9;
    display: grid;
    place-content: center;
    text-align: center;
    border-radius: 6px;
    color: #9d8189;
    font-size: 70%;

    &.selected {
      background-color: var(--bulma-primary-30);
      color: var(--bulma-primary-invert-30);
    }

    &:hover {
      background-color: var(--bulma-info-50);
      color: white;
      cursor: pointer;
      scale: 1.5;
    }
  }

  .columns {
    &-4 {
      grid-template-columns: repeat(4, 1fr);
    }
    &-5 {
      grid-template-columns: repeat(5, 1fr);
    }
    &-6 {
      grid-template-columns: repeat(6, 1fr);
    }
    &-8 {
      grid-template-columns: repeat(8, 1fr);
    }
    &-10 {
      grid-template-columns: repeat(10, 1fr);
    }
    &-12 {
      grid-template-columns: repeat(12, 1fr);
    }
  }

  .rows {
    &-2 {
      grid-template-rows: repeat(2, 1fr);
    }
    &-3 {
      grid-template-rows: repeat(3, 1fr);
    }
    &-4 {
      grid-template-rows: repeat(4, 1fr);
    }
    &-5 {
      grid-template-rows: repeat(5, 1fr);
    }
    &-6 {
      grid-template-rows: repeat(6, 1fr);
    }
  }

  #Z-1 {
    grid-column: 25/30;
    grid-row: 2/6;
  }

  #Z-2 {
    grid-column: 25/30;
    grid-row: 6/13;
  }

  #Z-3 {
    grid-column: 20/25;
    grid-row: 7/13;
    // rotate: -8deg;
  }

  #Z-4 {
    grid-column: 15/20;
    grid-row: 7/13;
  }

  #Z-5 {
    grid-column: 10/15;
    grid-row: 7/13;
    // rotate: 8deg;
  }

  #Z-6 {
    grid-column: 5/10;
    grid-row: 7/13;
  }

  #Z-7 {
    grid-column: 5/10;
    grid-row: 2/7;
    order: -1;
  }

  #Z-8 {
    grid-column: 1/5;
    grid-row: 2/10;
  }

  #Z-9 {
    grid-column: 1/5;
    grid-row: 10/14;
  }

  #Z-10 {
    grid-column: 5/10;
    grid-row: 14/18;
  }

  #Z-11 {
    grid-column: 10/17;
    grid-row: 14/18;
  }

  #Z-12 {
    grid-column: 18/25;
    grid-row: 14/17;
  }

  #Z-13 {
    grid-column: 25/30;
    grid-row: 15/17;
  }

  #Z-13 {
    grid-column: 25/30;
    grid-row: 15/17;
  }

  #Z-14 {
    grid-column: 4/10;
    grid-row: 18/22;
  }

  #Z-15 {
    grid-column: 12/17;
    grid-row: 18/22;
  }

  #Z-16 {
    grid-column: 25/30;
    grid-row: 17/22;
  }

  #Z-17 {
    grid-column: 20/25;
    grid-row: 17/22;
  }

  #Z-18 {
    grid-column: 15/20;
    grid-row: 17/22;
  }

  #Z-19 {
    grid-column: 10/15;
    grid-row: 17/22;
  }

  #Z-20 {
    grid-column: 1/7;
    grid-row: 15/22;
    rotate: 45deg;
    translate: 60px -60px;
  }

  #Z-21 {
    grid-column: 1/6;
    grid-row: 8/12;
  }

  #Z-22 {
    grid-column: 1/6;
    grid-row: 2/8;
  }
</style>
