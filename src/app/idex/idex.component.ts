import {Component, OnInit, ViewChild} from '@angular/core';

import {TreeComponent, TreeNode, ITreeItem} from 'ng-devui/tree';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-idex',
  templateUrl: './idex.component.html',
  styleUrls: ['./idex.component.css']
})
export class IdexComponent implements OnInit {


  ngOnInit(): void {
  }

  currentSelectedNode;
  iconParentOpen = '<img src="../../assets/img/dow.png" style="width: 16px;height: 8px">';
  iconParentClose = '<img src="../../assets/img/jiantou@2x.png" style="width: 8px;height: 16px">';
  iconLeaf = '<span></span>';
  data2 = [{
    'title': '父节点1',
    'data': {'type': 'mix'},
    'open': true,
    'status': '状态1',
    'children': [{
      'title': '子节点1-1',
      'data': {'type': 'mix'},
      'open': false,
      'status': '状态1',
      'children': [{
        'title': '子节点1-1-1',
        'data': {'type': 'ppt'},
        'status': '状态2',
      }, {
        'title': '子节点1-1-2',
        'data': {'type': 'xls'}, 'status': '状态2',
      }]
    }, {
      'title': '子节点1-2',
      'data': {'type': 'mix'},
      'open': false,
      'status': '状态1',
      'children': [{
        'title': '子节点1-2-1',
        'data': {'type': 'ppt'},
        'status': '状态1',
      }, {
        'title': '子节点1-2-2',
        'data': {'type': 'doc'},
        'status': '状态1',
      }]
    }]
  }, {
    'title': '父节点2',
    'data': {'type': 'ppt'},
    'open': false,
    'status': '状态1',
    'children': [{
      'title': '子节点2-1',
      'data': {'type': 'ppt'},
      'status': '状态1',
    }, {
      'title': '子节点2-2',
      'data': {'type': 'ppt'},
      'status': '状态1',
    }],
  }, {
    'title': '父节点3',
    'data': {'type': 'xls'},
    'open': false,
    'status': '状态1',
    'children': [{
      'title': '子节点3-1',
      'data': {'type': 'xls'},
      'status': '状态1',
    }, {
      'title': '子节点3-2',
      'data': {'type': 'xls'},
      'status': '状态1',
    }]
  }];

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }

  onBlurEdit(treeNode) {
    treeNode.editable = false;
  }

  showNode(node) {
    console.log(node);
  }


}
