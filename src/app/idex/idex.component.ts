import {Component, OnInit, ViewChild} from '@angular/core';

import {TreeComponent, TreeNode, ITreeItem} from 'ng-devui/tree';
import {Observable} from 'rxjs';
import {ClassSelectService} from './service/class-select.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {ArrayDataSource} from '@angular/cdk/collections';
import {ITreeNodeData} from 'ng-devui/tree/tree-factory.class';
import {RouteAnimations} from '../animation';

@Component({
  selector: 'app-idex',
  templateUrl: './idex.component.html',
  styleUrls: ['./idex.component.css'],
  animations: [RouteAnimations]
})
export class IdexComponent implements OnInit {
  @ViewChild('basicTree', { static: true }) basicTree: TreeComponent;
  constructor(
    private classSelectService: ClassSelectService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  currentSelectedNode;
  showLoading: boolean;
  iconParentOpen = '<img src="../../assets/img/dow.png" style="width: 16px;height: 8px"/>';
  iconParentClose = '<img src="../../assets/img/jiantou@2x.png" style="width: 8px;height: 16px" />';
  iconLeaf = '<span></span>';
  data2 = [
    {
    title: '电子病例（全部科室）',
    data: { type: 'mix' },
    open: true,
    status: '状态1',
    children: [
      {
      title: '子节点1-1',
      data: { type: 'mix' },
      open: false,
      status: '状态1',
      children: [
        {
        title: '子节点1-1-1',
        data: { type: 'ppt' },
        status: '状态2',
      },
        {
        title: '子节点1-1-2',
        data: { type: 'xls' }, status: '状态2',
      }
      ]
    }
    ]
  },
    // 权限管理
    {
      id: '0x120',
      title: '权限配置',
      data: { type: 'xls' },
      open: true,
      status: '状态1',
      children: [
        {
          id: '0x121',
          title: '权限管理',
          data: { type: 'xls' },
          status: '状态1',
        },
        {
          id: '0x122',
          title: '角色管理',
          data: { type: 'xls' },
          status: '状态1',
        }
      ]
    },

    // 系统配置
    {
      id: '0x130',
      title: '系统配置',
      data: { type: 'xls' },
      open: true,
      status: '状态1',
      item: [
        {
          id: '0x121',
          title: '权限管理',
          data: { type: 'xls' },
          status: '状态1',
        },
        {
          id: '0x122',
          title: '角色管理',
          data: { type: 'xls' },
          status: '状态1',
        }
      ]
    }
  ];



  onNodeSelected(treeNode: TreeNode) {
    console.log('父selected: ', treeNode);
    // tslint:disable-next-line:no-unused-expression
    const ds: ITreeNodeData = JSON.parse(JSON.stringify(treeNode));
    if ( ds.originItem.id === '0x130'){
      this.router.navigate(['index/depart']);
    }else if ( ds.originItem.id === '0x122'){// 角色
      this.router.navigate(['index/roles']);
    }else if (ds.originItem.id === '0x121'){// 权限
      this.router.navigate(['index/authority']);
    }else{
      this.router.navigate(['index/case']);
    }

    console.log('test: ', ds.originItem.id);
    this.classSelectService.announceMission(ds.originItem.id);
  }

  clearChildrenData(event, item): void{
    event.stopPropagation();
    item.children = [];
    item.needLoadChildren = true;
    item.open = false;
  }

  prepareRoute(outlet: RouterOutlet): any{
    const a = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    console.log('daoyi', a);
    return a;
  }






}
