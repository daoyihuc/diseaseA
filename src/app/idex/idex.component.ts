import {Component, OnInit, ViewChild} from '@angular/core';

import {TreeComponent, TreeNode, ITreeItem} from 'ng-devui/tree';
import {Observable} from 'rxjs';
import {ClassSelectService} from './service/class-select.service';

@Component({
  selector: 'app-idex',
  templateUrl: './idex.component.html',
  styleUrls: ['./idex.component.css']
})
export class IdexComponent implements OnInit {
  @ViewChild('basicTree', { static: true }) basicTree: TreeComponent;
  constructor(private classSelectService: ClassSelectService) {

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
      title: '父节点1 - 展开',
      isParent: true,
      open: false,
      disabled: false,
      children: [
        {
          title: '父节点11 - 折叠',
          children: [
            {
              id: '123',
              title: '叶子节点111'
            },
            {
              title: '叶子节点112'
            },
            {
              title: '叶子节点113'
            },
            {
              title: '叶子节点114'
            }
          ]
        },
        {
          title: '父节点12 - 折叠',
          disableToggle: true,
          items: [
            {
              title: '叶子节点121'
            },
            {
              title: '叶子节点122'
            },
            {
              title: '叶子节点123'
            },
            {
              title: '叶子节点124'
            }
          ]
        },
        {
          title: '父节点13 - 没有子节点 - 动态加载',
          isParent: true
        }
      ]
    },
    {
      title: '父节点2 - 折叠',
      items: [
        {
          title: '父节点21 - 展开',
          open: true,
          items: [
            {
              title: '叶子节点211'
            },
            {
              title: '叶子节点212'
            },
            {
              title: '叶子节点213'
            },
            {
              title: '叶子节点214'
            }
          ]
        },
        {
          title: '父节点22 - 折叠',
          items: [
            {
              title: '叶子节点221'
            },
            {
              title: '叶子节点222'
            },
            {
              title: '叶子节点223'
            },
            {
              title: '叶子节点224'
            }
          ]
        },
        {
          title: '父节点23 - 折叠',
          items: [
            {
              title: '叶子节点231'
            },
            {
              title: '叶子节点232'
            },
            {
              title: '叶子节点233'
            },
            {
              title: '叶子节点234'
            }
          ]
        }
      ]
    },
    {
      id: 'hello,dddd',
      title: '父节点3 - 没有子节点 - 动态加载',
      isParent: true,
      data: {
        id: '1123213',
        name: '456'
      }
    }
  ];


  onNodeSelected(treeNode: TreeNode) {
    console.log('父selected: ', treeNode);
    this.classSelectService.announceMission('0x11');
  }






}
