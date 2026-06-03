// ============================================================
// 富文本编辑器增强 —— 适用于所有 .rte-editor（事项内容/工作记录等）
//   1) 图片：点选后拖角柄自由缩放；双击还原原始大小
//   2) 表格：点单元格弹出工具条 → 增/删行、增/删列、删表
//   3) 表格列宽：拖单元格右边框自由调整
// 用 document 事件委托，自动适配后续动态生成的编辑器（含弹窗内）。
// 改动只影响编辑时的 DOM；保存时 sanitizeRichHtml 保留 style，故尺寸会持久化。
// ============================================================
(function () {
  'use strict';

  // ---------- 注入样式 ----------
  var css = '' +
    '.rte-editor img{cursor:pointer;-webkit-user-drag:none;max-width:100%;}' +
    '.rte-img-selected{outline:2px solid #6366f1!important;outline-offset:1px;}' +
    '#rteImgHandle{position:fixed;width:14px;height:14px;background:#6366f1;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 5px rgba(0,0,0,.35);cursor:nwse-resize;z-index:100002;display:none;}' +
    '#rteTableBar{position:fixed;z-index:100002;background:#1e293b;color:#fff;border-radius:7px;padding:4px;display:none;gap:1px;box-shadow:0 6px 18px rgba(0,0,0,.32);}' +
    '#rteTableBar button{background:transparent;border:none;color:#e5e7eb;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:12px;line-height:1.2;white-space:nowrap;}' +
    '#rteTableBar button:hover{background:rgba(255,255,255,.16);color:#fff;}' +
    '#rteTableBar .rte-tb-sep{width:1px;background:rgba(255,255,255,.18);margin:2px 2px;}' +
    '#rteTableBar button.rte-tb-danger:hover{background:#dc2626;}' +
    '.rte-editor table{border-collapse:collapse;}' +
    '.rte-editor table td,.rte-editor table th{position:relative;}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // ---------- 公共元素 ----------
  var handle = document.createElement('div');
  handle.id = 'rteImgHandle';
  document.body.appendChild(handle);

  var bar = document.createElement('div');
  bar.id = 'rteTableBar';
  document.body.appendChild(bar);

  var selImg = null;     // 当前选中的图片
  var curCell = null;    // 当前操作的单元格
  var EDGE = 6;          // 列宽拖拽：靠右边框的判定像素

  function cellStyle(isHeader) {
    return 'border:1px solid #d1d5db;padding:6px;min-width:40px;' + (isHeader ? 'background:#f3f4f6;font-weight:600;' : '');
  }
  function fireInput(el) {
    var ed = el && el.closest ? el.closest('.rte-editor') : null;
    if (ed) { try { ed.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {} }
  }

  // ================= 图片选择 / 缩放 =================
  function selectImg(img) {
    deselectImg();
    selImg = img;
    img.classList.add('rte-img-selected');
    img.setAttribute('draggable', 'false');
    positionHandle();
    handle.style.display = 'block';
  }
  function deselectImg() {
    if (selImg) selImg.classList.remove('rte-img-selected');
    selImg = null;
    handle.style.display = 'none';
  }
  function positionHandle() {
    if (!selImg) return;
    var r = selImg.getBoundingClientRect();
    handle.style.left = (r.right - 7) + 'px';
    handle.style.top = (r.bottom - 7) + 'px';
  }
  handle.addEventListener('mousedown', function (e) {
    if (!selImg) return;
    e.preventDefault(); e.stopPropagation();
    var startX = e.clientX, startW = selImg.getBoundingClientRect().width;
    var ed = selImg.closest('.rte-editor');
    var maxW = ed ? ed.clientWidth - 12 : 4000;
    function move(ev) {
      var w = Math.round(startW + (ev.clientX - startX));
      w = Math.max(40, Math.min(w, maxW));
      selImg.style.width = w + 'px';
      selImg.style.height = 'auto';
      positionHandle();
    }
    function up() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      fireInput(selImg);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  });
  // 双击图片 → 还原原始尺寸
  document.addEventListener('dblclick', function (e) {
    var img = e.target.closest ? e.target.closest('.rte-editor img') : null;
    if (!img) return;
    img.style.width = ''; img.style.height = '';
    if (selImg === img) positionHandle();
    fireInput(img);
  });

  // ================= 表格工具条 =================
  function tableCtx(cell) {
    var table = cell.closest('table');
    var tbody = cell.parentNode.parentNode; // tr -> tbody/table
    var tr = cell.parentNode;
    var rows = Array.prototype.slice.call((table.tBodies[0] || tbody).rows || tbody.children);
    var rowIndex = rows.indexOf(tr);
    var colIndex = Array.prototype.slice.call(tr.children).indexOf(cell);
    return { table: table, body: (table.tBodies[0] || tbody), tr: tr, rows: rows, rowIndex: rowIndex, colIndex: colIndex };
  }
  function buildBar() {
    bar.innerHTML = '';
    var groups = [
      [['↑行', 'rowAbove'], ['↓行', 'rowBelow'], ['✕行', 'rowDel', 1]],
      [['←列', 'colLeft'], ['→列', 'colRight'], ['✕列', 'colDel', 1]],
      [['🗑表', 'tableDel', 1]],
    ];
    groups.forEach(function (g, gi) {
      if (gi > 0) { var sp = document.createElement('span'); sp.className = 'rte-tb-sep'; bar.appendChild(sp); }
      g.forEach(function (item) {
        var b = document.createElement('button');
        b.textContent = item[0];
        if (item[2]) b.className = 'rte-tb-danger';
        b.title = item[0];
        b.addEventListener('mousedown', function (ev) { ev.preventDefault(); ev.stopPropagation(); });
        b.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); tableOp(item[1]); });
        bar.appendChild(b);
      });
    });
  }
  function showTableBar(cell) {
    curCell = cell;
    if (!bar.firstChild) buildBar();
    bar.style.display = 'flex';
    positionBar();
  }
  function hideTableBar() { bar.style.display = 'none'; curCell = null; }
  function positionBar() {
    if (!curCell || !document.contains(curCell)) { hideTableBar(); return; }
    var table = curCell.closest('table');
    if (!table) { hideTableBar(); return; }
    var r = table.getBoundingClientRect();
    var top = r.top - bar.offsetHeight - 6;
    if (top < 6) top = r.bottom + 6;              // 表格顶部空间不够则放下面
    bar.style.top = top + 'px';
    bar.style.left = Math.max(6, r.left) + 'px';
  }

  function tableOp(op) {
    if (!curCell || !document.contains(curCell)) { hideTableBar(); return; }
    var ctx = tableCtx(curCell);
    var ed = curCell.closest('.rte-editor');

    if (op === 'rowAbove' || op === 'rowBelow') {
      var newTr = document.createElement('tr');
      Array.prototype.slice.call(ctx.tr.children).forEach(function () {
        var td = document.createElement('td');
        td.setAttribute('style', cellStyle(false));
        td.innerHTML = '&nbsp;';
        newTr.appendChild(td);
      });
      if (op === 'rowAbove') ctx.tr.parentNode.insertBefore(newTr, ctx.tr);
      else ctx.tr.parentNode.insertBefore(newTr, ctx.tr.nextSibling);
    } else if (op === 'colLeft' || op === 'colRight') {
      var at = ctx.colIndex + (op === 'colRight' ? 1 : 0);
      ctx.rows.forEach(function (row, ri) {
        var ref = row.children[at] || null;
        var isHeader = (row.children[0] && row.children[0].tagName === 'TH');
        var cellTag = isHeader ? 'th' : 'td';
        var nc = document.createElement(cellTag);
        nc.setAttribute('style', cellStyle(isHeader));
        nc.innerHTML = isHeader ? ('标题') : '&nbsp;';
        row.insertBefore(nc, ref);
      });
    } else if (op === 'rowDel') {
      if (ctx.rows.length <= 1) { if (typeof toast === 'function') toast('至少保留一行', 'error'); return; }
      ctx.tr.parentNode.removeChild(ctx.tr);
      curCell = null; hideTableBar();
    } else if (op === 'colDel') {
      if (ctx.tr.children.length <= 1) { if (typeof toast === 'function') toast('至少保留一列', 'error'); return; }
      ctx.rows.forEach(function (row) {
        var c = row.children[ctx.colIndex];
        if (c) row.removeChild(c);
      });
      curCell = null; hideTableBar();
    } else if (op === 'tableDel') {
      if (typeof confirm === 'function' && !confirm('确定删除整个表格？')) return;
      var tbl = ctx.table;
      if (tbl && tbl.parentNode) tbl.parentNode.removeChild(tbl);
      curCell = null; hideTableBar();
    }
    fireInput(ed);
    if (curCell) positionBar();
  }

  // ================= 列宽拖拽（靠单元格右边框）=================
  var resizing = false, edgeHint = false;
  function nearRightEdge(cell, clientX) {
    var r = cell.getBoundingClientRect();
    return (r.right - clientX <= EDGE && r.right - clientX >= -2);
  }
  function startColResize(cell, e) {
    var ctx = tableCtx(cell);
    var startX = e.clientX, startW = cell.getBoundingClientRect().width;
    e.preventDefault();
    resizing = true;
    document.body.style.cursor = 'col-resize';
    function move(ev) {
      var w = Math.max(30, Math.round(startW + (ev.clientX - startX)));
      ctx.rows.forEach(function (row) {
        var c = row.children[ctx.colIndex];
        if (c) c.style.width = w + 'px';
      });
      if (selImg) positionHandle();
      positionBar();
    }
    function up() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      document.body.style.cursor = '';
      resizing = false;
      fireInput(cell);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  // 鼠标移到单元格右边框附近 → 用 body 级 col-resize 光标做提示（不写进单元格 style，避免污染保存内容）
  document.addEventListener('mousemove', function (e) {
    if (resizing) return;
    var cell = e.target.closest ? e.target.closest('.rte-editor td, .rte-editor th') : null;
    var near = cell ? nearRightEdge(cell, e.clientX) : false;
    if (near && !edgeHint) { document.body.style.cursor = 'col-resize'; edgeHint = true; }
    else if (!near && edgeHint) { document.body.style.cursor = ''; edgeHint = false; }
  });

  // ================= 统一 mousedown 分发 =================
  document.addEventListener('mousedown', function (e) {
    if (e.target === handle) return;                 // 角柄拖拽自行处理
    if (bar.contains(e.target)) return;              // 点工具条

    var cell = e.target.closest ? e.target.closest('.rte-editor td, .rte-editor th') : null;

    // 1) 列宽拖拽优先（靠右边框）
    if (cell) {
      var rr = cell.getBoundingClientRect();
      if (rr.right - e.clientX <= EDGE && rr.right - e.clientX >= -2) {
        deselectImg();
        showTableBar(cell);
        startColResize(cell, e);
        return;
      }
    }

    // 2) 点图片 → 选中缩放
    var img = e.target.closest ? e.target.closest('.rte-editor img') : null;
    if (img) {
      selectImg(img);
      hideTableBar();
      return;
    }
    deselectImg();

    // 3) 点单元格 → 表格工具条
    if (cell) {
      showTableBar(cell);
    } else {
      hideTableBar();
    }
  }, true);

  // 滚动 / 缩放时跟随
  window.addEventListener('scroll', function () { if (selImg) positionHandle(); if (curCell) positionBar(); }, true);
  window.addEventListener('resize', function () { if (selImg) positionHandle(); if (curCell) positionBar(); });

  // Esc：收起浮层（避免弹窗关闭后残留）
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { deselectImg(); hideTableBar(); }
  });
  // 选中目标被移除（如弹窗关闭）时自动收起
  setInterval(function () {
    if (selImg && !document.contains(selImg)) deselectImg();
    if (curCell && !document.contains(curCell)) hideTableBar();
  }, 800);

})();
