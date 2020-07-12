export const RepositoryRecord = ({ id, name, watchersCount }) =>
  <div className="record">
    <div className="id">{id}</div>
    <div className="name">{name}</div>
    <div className="watchers">{watchersCount}</div>
    
    <style jsx>
    {`
      .record {
        color: #cdcdcd;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 1.5rem;
      }

      @media (min-width: 568px) {
        .record {
          flex-direction: row;
          padding-bottom: .5rem;
        }
        .id {
          width: 20rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .name {
          width: 20rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .watchers {
          text-align: right;
        }
      }

      @media (min-width: 768px) {
        .id {
          width: 40rem;
        }
        .name {
          width: 40rem;
        }
      }
    `}
    </style>
  </div>