// CSS
import css from "./targetHeader.module.css";

// Icons
import { AddUserWhite, ArrowDownGray } from "../../../assets/icons/";

// Core packages
import { useEffect, useState, useRef } from "react";

// Components
import { Button, Input } from "../../../components/common";

// Target-ууд filter-дэх state-ууд
const statuses = [
  { title: "Бүх төлөв", value: "" },
  { title: "Төлөвлөгөө үүссэн", value: "1" },
  { title: "Төлөвлөгөө үүсээгүй", value: "2" },
];

export const TargetHeader = (props) => {
  // Props-оор дамжуулсан утгуудыг салгаж авна
  const { setShowAddUser, setSelectedStatus, selectedStatus, searchName, setSearchName, loading } = props;

  // Төлөв filter-ын dropdown-г удирдах state
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  // Төлөв filter-ын ref
  const statusFilterRef = useRef(null);

  // Төлөв filter-ээс гадуур дарагдах үед dropdown-г хаана
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (statusFilterRef.current && showStatusFilter && !statusFilterRef.current.contains(e.target)) {
        setShowStatusFilter(false);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);

    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
    };
  }, [showStatusFilter]);

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        {/* Гарчиг */}
        <h1 className={css.title}>Төлөвлөгөө</h1>

        {/* Filter-ууд */}
        {!loading && (
          <div className={css.filters}>
            {/* Нэрээр хайх filter */}
            <Input value={searchName} onChange={(e) => setSearchName(e.target.value)} size="small" placeholder="Хайх" width={205} height="100%" />

            {/* Төлөвөөр хайх filter */}
            <div className={css.statusFilterWrapper}>
              <button type="button" onClick={() => setShowStatusFilter(true)} className={css.statusFilterBtn}>
                <span>{statuses.find((stat) => stat.value === selectedStatus).title}</span>
                <ArrowDownGray width={22} height={22} />
              </button>

              {showStatusFilter && (
                <div ref={statusFilterRef} className={css.statusFilterDropdownWrapper}>
                  <div className={css.triangle} />

                  <div className={css.statusFilterDropdown}>
                    {statuses.map((status, index) => {
                      return (
                        <button
                          key={`target-header-status-${index}`}
                          onClick={() => {
                            setSelectedStatus(status.value);
                            setShowStatusFilter(false);
                          }}
                          className={css.singleStatusBtn}
                          style={{
                            boxShadow: index === statuses.length - 1 && "none",
                            zIndex: statuses.length - index,
                          }}
                          type="button"
                        >
                          <span>{status.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={css.rightSide}>
        {/* Ажилтан нэмэх товч */}
        {!loading && (
          <Button onClick={() => setShowAddUser(true)} variant="primary" size="medium" icon>
            <AddUserWhite />
            Ажилтан нэмэх
          </Button>
        )}
      </div>
    </div>
  );
};
