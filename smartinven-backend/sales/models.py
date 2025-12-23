from django.db import models
from inventory.models import Product
# Create your models here.

class Sales(models.Model):
  product=models.ForeignKey(Product, on_delete=models.CASCADE)
  quantity=models.PositiveIntegerField(default=1)
  unit_price=models.DecimalField(max_digits=10,decimal_places=2)
  total_amount=models.DecimalField(max_digits=10,decimal_places=2)
  customer_name=models.CharField(max_length=255,blank=True,null=True)
  sales_date=models.DateField()
  created_at=models.DateTimeField(auto_now_add=True)


  def save(self,*args,**kwargs):
    self.total_amount=self.quantity* self.unit_price
    super().save(*args,**kwargs)
  def __str__(self):
    return f"{self.product.name} - {self.quantity}"